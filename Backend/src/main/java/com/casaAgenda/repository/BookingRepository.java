package com.casaAgenda.repository;
import com.casaAgenda.entity.Booking;
import com.casaAgenda.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>, JpaSpecificationExecutor<Booking> {
    List<Booking> findByStatusIn(List<Status> statuses);
    //Esto dice: "buscá si hay otra reserva ocupando esas fechas", es decir que si aparece uno, no está disponible
    @Query("""
    select (count(b) = 0)
    from Booking b
    where b.apartment.id = :apartmentId
      and b.status in (com.casaAgenda.enums.Status.PENDING, com.casaAgenda.enums.Status.ACTIVE)
      and b.checkIn < :checkOut
      and b.checkOut > :checkIn
""")
    boolean isApartmentAvailable(
            @Param("apartmentId") Long apartmentId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );


    // En update se excluye la reserva actual del chequeo de disponibilidad,
    // para evitar que entre en conflicto con la misma reserva
    @Query("""
    select (count(b) = 0)
    from Booking b
    where b.apartment.id = :apartmentId
      and b.id <> :bookingId
      and b.status in (com.casaAgenda.enums.Status.PENDING, com.casaAgenda.enums.Status.ACTIVE)
      and b.checkIn < :checkOut
      and b.checkOut > :checkIn
""")
    boolean isApartmentAvailableForUpdate(
            @Param("apartmentId") Long apartmentId,
            @Param("bookingId") Long bookingId,
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );
}