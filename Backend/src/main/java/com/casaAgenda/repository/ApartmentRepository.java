package com.casaAgenda.repository;
import com.casaAgenda.entity.Apartment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
@Repository
public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    @Query(value = "select * from apartment", nativeQuery = true)
    List<Apartment> findAllIncludingInactive();
    @Query("""
    select a
    from Apartment a
    where not exists (
          select 1
          from Booking b
          where b.apartment = a
            and b.status in (com.casaAgenda.enums.Status.PENDING, com.casaAgenda.enums.Status.ACTIVE)
            and b.checkIn < :checkOut
            and b.checkOut > :checkIn
      )
""")
    List<Apartment> findAvailableApartments(
            @Param("checkIn") LocalDate checkIn,
            @Param("checkOut") LocalDate checkOut
    );
}