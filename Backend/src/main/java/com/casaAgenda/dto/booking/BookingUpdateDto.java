package com.casaAgenda.dto.booking;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record BookingUpdateDto(Long apartmentId,
                               LocalDate checkIn,
                               LocalDate checkOut,
                               @Size(max = 100, message = "El nombre del huésped no puede superar los 100 carácteres")
                               String guestName,
                               @Positive(message = "La cantidad mínima de gente es 1")
                               Integer people,
                               @Positive(message = "El precio por noche debe ser positivo")
                               Double priceNight,
                               @PositiveOrZero(message = "El deposito no puede ser negativo")
                               Double deposit,
                               @Positive(message = "El total debe ser positivo")
                               Double total,
                               @PositiveOrZero(message = "El restante no puede ser negativo")
                               Double remaining,
                               @Positive(message = "El precio por persona debe ser positivo")
                               Double pricePerPerson,
                               @Size(max = 300, message = "Las notas no pueden superar los 300 carácteres")
                               String notes
                               ) {
    @AssertTrue(message = "La fecha de salida debe ser posterior a la fecha de ingreso")
    public boolean isDateRangeValid() {
        if (checkIn == null || checkOut == null) return true;
        return checkOut.isAfter(checkIn);
    }
}
