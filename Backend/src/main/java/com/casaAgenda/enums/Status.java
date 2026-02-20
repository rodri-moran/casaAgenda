package com.casaAgenda.enums;
public enum Status {
    PENDING, // Reserva creada pero todavía no comenzó (antes del check-in)
    ACTIVE, // Los huéspedes están actualmente alojados
    COMPLETE, // Ya hicieron check-out
    CANCELLED // Reserva cancelada
}