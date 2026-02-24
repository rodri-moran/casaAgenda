package com.casaAgenda.service.impl;
import com.casaAgenda.dto.booking.BookingCreateDto;
import com.casaAgenda.dto.booking.BookingResponseDto;
import com.casaAgenda.dto.booking.BookingUpdateDto;
import com.casaAgenda.entity.Apartment;
import com.casaAgenda.entity.Booking;
import com.casaAgenda.enums.Status;
import com.casaAgenda.repository.ApartmentRepository;
import com.casaAgenda.repository.BookingRepository;
import com.casaAgenda.service.BookingService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final ApartmentRepository apartmentRepository;
    @Override
    public BookingResponseDto create(BookingCreateDto dto) {
        Apartment apartment = apartmentRepository.findById(dto.apartmentId())
                .orElseThrow(() -> new EntityNotFoundException("Apartment with id " + dto.apartmentId() + " not found."));
        if(!isApartmentAvailable(dto.apartmentId(), dto.checkIn(), dto.checkOut())){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "APARTMENT_NOT_AVAILABLE");
        }
        if (dto.checkIn() == null || dto.checkOut() == null || !dto.checkOut().isAfter(dto.checkIn())) {
            throw new IllegalArgumentException("CheckOut must be after checkIn");
        }
        Booking booking = Booking.builder()
                .apartment(apartment)
                .checkIn(dto.checkIn())
                .checkOut(dto.checkOut())
                .guestName(dto.guestName())
                .people(dto.people())
                .deposit(dto.deposit())
                .remaining(dto.remaining())
                .total(dto.total())
                .notes(dto.notes())
                .priceNight(dto.priceNight())
                .pricePerPerson(dto.pricePerPerson())
                .status(calculateStatus(dto.checkIn(), dto.checkOut()))
                .build();
        booking = bookingRepository.save(booking);
        return toResponse(booking);
    }

    @Override
    public BookingResponseDto update(Long id, BookingUpdateDto dto) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        LocalDate finalCheckIn = dto.checkIn() != null ? dto.checkIn() : booking.getCheckIn();
        LocalDate finalCheckOut = dto.checkOut() != null ? dto.checkOut() : booking.getCheckOut();

        Long targetApartmentId = dto.apartmentId() != null ? dto.apartmentId()
                : booking.getApartment().getId();

        if (!bookingRepository.isApartmentAvailableForUpdate(targetApartmentId, id, finalCheckIn, finalCheckOut)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "APARTMENT_NOT_AVAILABLE");
        }

        booking = mapUpdateDtoToEntity(booking, dto);

        bookingRepository.save(booking);

        return toResponse(booking);
    }

    @Override
    public List<BookingResponseDto> getByStatus(List<Status> statuses) {
        return bookingRepository.findByStatusIn(statuses)
                .stream()
                .map(this::toResponse)
                .toList();
    }
    @Override
    public BookingResponseDto get(Long id) {
        return toResponse(bookingRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Booking not found")));
    }

    @Override
    public BookingResponseDto cancel(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found"));
        if(booking.getStatus() == Status.CANCELLED){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "BOOKING_ALREADY_CANCELLED");
        }

        booking.setStatus(Status.CANCELLED);
        bookingRepository.save(booking);
        return toResponse(booking);
    }

    @Override
    public Boolean isApartmentAvailable(Long apartmentId, LocalDate checkIn, LocalDate checkOut) {
        Apartment apartment = apartmentRepository.findById(apartmentId)
                .orElseThrow(() -> new EntityNotFoundException("Apartment with id " + apartmentId + " not found."));
        return bookingRepository.isApartmentAvailable(apartmentId, checkIn, checkOut);
    }
    private BookingResponseDto toResponse(Booking entity){
        return new BookingResponseDto(
                entity.getId(),
                entity.getApartment().getId(),
                entity.getCheckIn(),
                entity.getCheckOut(),
                entity.getGuestName(),
                entity.getPeople(),
                entity.getDeposit(),
                entity.getRemaining(),
                entity.getTotal(),
                entity.getStatus(),
                entity.getNotes(),
                entity.getPriceNight(),
                entity.getPricePerPerson()
                );
    }

    private Status calculateStatus(LocalDate checkIn, LocalDate checkOut){
        LocalDate today = LocalDate.now();

        if (today.isBefore(checkIn)) return Status.PENDING;
        if (today.isBefore(checkOut)) return Status.ACTIVE;
        return Status.COMPLETE;
    }
    private Booking mapUpdateDtoToEntity(Booking booking, BookingUpdateDto dto){
        if(dto.apartmentId() != null && !Objects.equals(booking.getApartment().getId(), dto.apartmentId())){
            Apartment apartment = apartmentRepository.findById(dto.apartmentId()).orElseThrow(() -> new EntityNotFoundException("Apartment with id " + dto.apartmentId() + " not found"));
            booking.setApartment(apartment);
        }
        if (dto.checkIn() != null) {
            booking.setCheckIn(dto.checkIn());
        }
        if (dto.checkOut() != null) {
            booking.setCheckOut(dto.checkOut());
        }
        if (booking.getCheckIn() != null && booking.getCheckOut() != null
                && !booking.getCheckOut().isAfter(booking.getCheckIn())) {
            throw new IllegalArgumentException("checkOut must be after checkIn");
        }
        if (dto.guestName() != null) {
            booking.setGuestName(dto.guestName());
        }
        if (dto.people() != null) {
            booking.setPeople(dto.people());
        }
        if (dto.priceNight() != null) {
            booking.setPriceNight(dto.priceNight());
        }
        if (dto.deposit() != null) {
            booking.setDeposit(dto.deposit());
        }
        if (dto.total() != null) {
            booking.setTotal(dto.total());
        }
        if (dto.remaining() != null) {
            booking.setRemaining(dto.remaining());
        }
        if (dto.pricePerPerson() != null) {
            booking.setPricePerPerson(dto.pricePerPerson());
        }
        if (dto.notes() != null) {
            booking.setNotes(dto.notes());
        }
        booking.setStatus(calculateStatus(booking.getCheckIn(), booking.getCheckOut()));
        return booking;
    }
}