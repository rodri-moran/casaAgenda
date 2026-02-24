package com.casaAgenda.service;

import com.casaAgenda.dto.apartment.ApartmentCreateDto;
import com.casaAgenda.dto.apartment.ApartmentResponseDto;
import com.casaAgenda.dto.apartment.ApartmentUpdateDto;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public interface ApartmentService {
    ApartmentResponseDto create(ApartmentCreateDto dto);
    ApartmentResponseDto update(Long id, ApartmentUpdateDto dto);
    ApartmentResponseDto get(Long id);
    List<ApartmentResponseDto> get();
    void softDelete(Long id);
    ApartmentResponseDto safeDelete(Long id);
    List<ApartmentResponseDto> getAllIncludingInactive();
    List<ApartmentResponseDto> getAvailableApartments(LocalDate checkIn, LocalDate checkOut);
    String upload (MultipartFile file) throws IOException;
}
