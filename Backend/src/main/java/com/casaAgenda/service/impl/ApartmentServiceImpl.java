package com.casaAgenda.service.impl;

import com.casaAgenda.dto.apartment.ApartmentCreateDto;
import com.casaAgenda.dto.apartment.ApartmentResponseDto;
import com.casaAgenda.dto.apartment.ApartmentUpdateDto;
import com.casaAgenda.entity.Apartment;
import com.casaAgenda.entity.Booking;
import com.casaAgenda.repository.ApartmentRepository;
import com.casaAgenda.service.ApartmentService;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class ApartmentServiceImpl implements ApartmentService {
    private final ModelMapper modelMapper;
    private final ApartmentRepository apartmentRepository;

    public ApartmentServiceImpl(ModelMapper modelMapper, ApartmentRepository apartmentRepository){
        this.modelMapper = modelMapper;
        this.apartmentRepository = apartmentRepository;
    }

    @Override
    public ApartmentResponseDto create(ApartmentCreateDto dto) {
        Apartment apartment = Apartment.builder()
                .name(dto.name())
                .description(dto.description())
                .capacity(dto.capacity())
                .imageUrl(dto.imageUrl())
//              .active(true)
                .build();

        apartment = apartmentRepository.save(apartment);

        return toResponse(apartment);
    }
    @Override
    public ApartmentResponseDto update(Long id, ApartmentUpdateDto dto) {
        Apartment apartment = apartmentRepository.findById(id)
                .orElseThrow(() -> notFound(id));
        if(dto.name() != null && !dto.name().isBlank()){
            apartment.setName(dto.name());
        }
        if(dto.description() != null && !dto.description().isBlank()){
            apartment.setDescription(dto.description());
        }
        if(dto.capacity() != null){
            apartment.setCapacity(dto.capacity());
        }
        if(dto.imageUrl() != null && !dto.imageUrl().isBlank()){
            apartment.setImageUrl(dto.imageUrl());
        }
        apartment = apartmentRepository.save(apartment);

        return toResponse(apartment);
    }

    @Override
    public ApartmentResponseDto get(Long id) {
        return null;
    }

    @Override
    public List<ApartmentResponseDto> get() {
        return apartmentRepository.findAll()
                .stream()
                .map(this :: toResponse)
                .toList();
    }

    @Override
    public void softDelete(Long id) {
        Apartment apartment = apartmentRepository.findById(id)
                .orElseThrow(() -> notFound(id));
        apartmentRepository.deleteById(id);
    }

    @Override
    public ApartmentResponseDto safeDelete(Long id) {
        return null;
    }

    @Override
    public List<ApartmentResponseDto> getAllIncludingInactive() {
        return apartmentRepository.findAllIncludingInactive()
                .stream()
                .map(this:: toResponse)
                .toList();
    }

    @Override
    public List<ApartmentResponseDto> getAvailableApartments(LocalDate checkIn, LocalDate checkOut) {
        return apartmentRepository.findAvailableApartments(checkIn, checkOut)
                .stream()
                .map(this::toResponse).toList();
    }

    private ApartmentResponseDto toResponse(Apartment entity){
        return new ApartmentResponseDto(
                entity.getId(),
                entity.getName(),
                entity.getDescription(),
                entity.getCapacity(),
                entity.getImageUrl());
//                entity.isActive());
    }

    private EntityNotFoundException notFound(Long id){
        return new EntityNotFoundException("Apartment with id "+ id + " not found.");
    }
}
