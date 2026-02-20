package com.casaAgenda.dto.apartment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ApartmentUpdateDto(String name,
                                 String description,
                                 @Positive(message = "La capacidad debe ser mayor a 0")
                                 Integer capacity,
                                 String imageUrl
                                 ) {
}
