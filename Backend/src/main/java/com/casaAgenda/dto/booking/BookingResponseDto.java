package com.casaAgenda.dto.booking;

import com.casaAgenda.enums.Status;

import java.time.LocalDate;

public record BookingResponseDto(Long id,
                                 Long apartmentId,
                                 LocalDate checkIn,
                                 LocalDate checkOut,
                                 String guestName,
                                 Integer people,
                                 Double deposit,
                                 Double remaining,
                                 Double total,
                                 Status status,
                                 String notes,
                                 Double priceNight,
                                 Double pricePerPerson
                                 ) {
}
