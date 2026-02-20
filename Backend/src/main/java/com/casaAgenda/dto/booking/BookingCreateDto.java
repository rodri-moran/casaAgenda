package com.casaAgenda.dto.booking;
import jakarta.validation.constraints.AssertTrue;

import java.time.LocalDate;

public record BookingCreateDto(Long apartmentId,
                               LocalDate checkIn,
                               LocalDate checkOut,
                               String guestName,
                               Integer people,
                               Double deposit,
                               Double remaining,
                               Double total,
                               String notes,
                               Double priceNight,
                               Double pricePerPerson) {
    @AssertTrue(message = "La fecha de salida debe ser posterior a la fecha de ingreso")
    public boolean isDateRangeValid() {
        if (checkIn == null || checkOut == null) {
            return true;
        }
        return checkOut.isAfter(checkIn);
    }
}