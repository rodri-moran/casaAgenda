package com.casaAgenda.controller;
import com.casaAgenda.dto.booking.BookingCreateDto;
import com.casaAgenda.dto.booking.BookingResponseDto;
import com.casaAgenda.dto.booking.BookingUpdateDto;
import com.casaAgenda.enums.Status;
import com.casaAgenda.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    @PostMapping
    public ResponseEntity<BookingResponseDto> create(@Valid @RequestBody BookingCreateDto dto){
        return ResponseEntity.ok(bookingService.create(dto));
    }
    @PatchMapping("/{id}")
    public ResponseEntity<BookingResponseDto> update(@PathVariable Long id, @Valid @RequestBody BookingUpdateDto dto){
        return ResponseEntity.ok(bookingService.update(id, dto));
    }
    @GetMapping 
    public ResponseEntity<List<BookingResponseDto>> getByStatus(@RequestBody List<Status> statuses){
        return ResponseEntity.ok(bookingService.getByStatus(statuses));
    }
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDto> getById(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.get(id));
    }
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDto> cancel(@PathVariable Long id){
        return ResponseEntity.ok(bookingService.cancel(id));
    }
}