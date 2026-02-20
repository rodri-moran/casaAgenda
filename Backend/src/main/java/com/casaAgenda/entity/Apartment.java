package com.casaAgenda.entity;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SoftDelete;
import org.hibernate.annotations.SoftDeleteType;
import java.util.ArrayList;
import java.util.List;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SoftDelete(strategy = SoftDeleteType.ACTIVE)
public class Apartment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Builder.Default
    @OneToMany(mappedBy = "apartment")
    private List<Booking> bookings = new ArrayList<>();
    private String name;
    @Nullable
    private String description;
    private Integer capacity;
    @Nullable
    private String imageUrl;
//    @Column(nullable = false)
//    private boolean active;
}