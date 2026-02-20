package com.casaAgenda.service;
import com.casaAgenda.dto.booking.BookingCreateDto;
import com.casaAgenda.dto.booking.BookingResponseDto;
import com.casaAgenda.dto.booking.BookingUpdateDto;
import com.casaAgenda.enums.Status;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
@Service
public interface BookingService {
    BookingResponseDto create(BookingCreateDto dto);
    BookingResponseDto update(Long id, BookingUpdateDto dto);
    List<BookingResponseDto> getByStatus(List<Status> statuses);
    BookingResponseDto get(Long id);
    BookingResponseDto cancel(Long id);
    Boolean isApartmentAvailable(Long apartmentId, LocalDate checkIn, LocalDate checkOut);
}