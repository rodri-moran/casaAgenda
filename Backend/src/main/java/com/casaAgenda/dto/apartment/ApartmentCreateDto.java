package com.casaAgenda.dto.apartment;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.hibernate.validator.constraints.URL;

public record ApartmentCreateDto(@NotBlank(message = "El nombre es obligatorio")
                                 String name,
                                 String description,
                                 @NotNull(message = "La capacidad es obligatoria")
                                 @Positive(message = "La capacidad debe ser mayor a 0")
                                 Integer capacity,
                                 @URL
                                 String imageUrl) {
}