package com.casaAgenda.entity;

import com.casaAgenda.enums.Status;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="apartment_id", nullable = false)
    private Apartment apartment;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String guestName;
    private Integer people;
    private Double deposit;
    private Double remaining;
    private Double total;
    @Enumerated(EnumType.STRING)
    private Status status;
    private String notes;
    private Double priceNight;
    private Double pricePerPerson;
}