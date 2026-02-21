package com.casaAgenda.controller;
import com.casaAgenda.dto.apartment.ApartmentCreateDto;
import com.casaAgenda.dto.apartment.ApartmentResponseDto;
import com.casaAgenda.dto.apartment.ApartmentUpdateDto;
import com.casaAgenda.service.ApartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/apartment")
@CrossOrigin(origins = "http://localhost:4200")
public class ApartmentCotroller {
    private final ApartmentService apartmentService;
    public ApartmentCotroller(ApartmentService apartmentService){
        this.apartmentService = apartmentService;
    }

    @PostMapping
    public ResponseEntity<ApartmentResponseDto> create(@Valid @RequestBody ApartmentCreateDto dto){
        return ResponseEntity.ok(apartmentService.create(dto));
    }
    @GetMapping
    public ResponseEntity<List<ApartmentResponseDto>> getAll(){
        return ResponseEntity.ok(apartmentService.get());
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(@PathVariable Long id){
        apartmentService.softDelete(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<ApartmentResponseDto>> getAllIncludingInactive(){
        return ResponseEntity.ok(apartmentService.getAllIncludingInactive());
    }
    @PatchMapping("/{id}")
    public ResponseEntity<ApartmentResponseDto> update(@Valid @RequestBody ApartmentUpdateDto dto,@PathVariable Long id){
        return ResponseEntity.ok(apartmentService.update(id, dto));
    }
}