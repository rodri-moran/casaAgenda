-- =====================================================================
-- Datos de ejemplo para desarrollo local (H2 en memoria).
-- Spring lo ejecuta solo con bases embebidas (spring.sql.init.mode=embedded
-- por defecto), asi que NO corre contra Postgres/Neon en produccion.
-- Las fechas son relativas a hoy, para que siempre haya reservas
-- pasadas, en curso y futuras.
-- Formula (igual que el front): precio noche = precio por persona * personas;
-- total = precio noche * noches; restante = total - seña.
-- =====================================================================

-- ---------- Departamentos ----------
INSERT INTO apartment (name, description, capacity, active) VALUES
('Cabaña Los Espinillos', 'Cabaña con parrilla y jardín, a 300 m del centro de Tanti.', 4, TRUE),
('Depto Vista al Río', 'Departamento para pareja, con balcón y vista al río.', 2, TRUE),
('Dúplex Las Sierras', 'Dúplex de dos plantas, ideal para familias grandes. Pileta compartida.', 6, TRUE),
('Monoambiente El Mirador', 'Monoambiente simple y cómodo.', 2, TRUE),
('Casa del Arroyo', 'Casa amplia junto al arroyo, sin reservas cargadas todavía.', 8, TRUE);

-- ---------- Reservas ----------
INSERT INTO booking (apartment_id, check_in, check_out, guest_name, people, price_per_person, price_night, total, deposit, remaining, status, notes) VALUES
-- Cabaña Los Espinillos ($25.000 por persona)
((SELECT id FROM apartment WHERE name = 'Cabaña Los Espinillos'), DATEADD('DAY', -20, CURRENT_DATE), DATEADD('DAY', -15, CURRENT_DATE), 'Juan Pérez', 4, 25000, 100000, 500000, 150000, 350000, 'COMPLETE', 'Vinieron con un perro chico.'),
((SELECT id FROM apartment WHERE name = 'Cabaña Los Espinillos'), DATEADD('DAY', -2, CURRENT_DATE), DATEADD('DAY', 3, CURRENT_DATE), 'Lucía Fernández', 3, 25000, 75000, 375000, 110000, 265000, 'ACTIVE', 'Pidieron cuna para bebé.'),
((SELECT id FROM apartment WHERE name = 'Cabaña Los Espinillos'), DATEADD('DAY', 5, CURRENT_DATE), DATEADD('DAY', 8, CURRENT_DATE), 'Martín Gómez', 4, 25000, 100000, 300000, 0, 300000, 'CANCELLED', 'Canceló por motivos de salud.'),
((SELECT id FROM apartment WHERE name = 'Cabaña Los Espinillos'), DATEADD('DAY', 10, CURRENT_DATE), DATEADD('DAY', 14, CURRENT_DATE), 'Sofía Romero', 2, 25000, 50000, 200000, 60000, 140000, 'PENDING', NULL),

-- Depto Vista al Río ($22.000 por persona)
((SELECT id FROM apartment WHERE name = 'Depto Vista al Río'), DATEADD('DAY', -9, CURRENT_DATE), DATEADD('DAY', -6, CURRENT_DATE), 'Carlos Díaz', 2, 22000, 44000, 132000, 40000, 92000, 'COMPLETE', NULL),
((SELECT id FROM apartment WHERE name = 'Depto Vista al Río'), DATEADD('DAY', 1, CURRENT_DATE), DATEADD('DAY', 4, CURRENT_DATE), 'María Fernanda Gutiérrez Albarracín', 2, 22000, 44000, 132000, 50000, 82000, 'PENDING', 'Llegan tarde, después de las 22 hs. Dejar la llave en la caja de seguridad de la entrada.'),
((SELECT id FROM apartment WHERE name = 'Depto Vista al Río'), DATEADD('DAY', 20, CURRENT_DATE), DATEADD('DAY', 27, CURRENT_DATE), 'Diego Sánchez', 2, 22000, 44000, 308000, 100000, 208000, 'PENDING', 'Luna de miel.'),

-- Dúplex Las Sierras ($20.000 por persona)
((SELECT id FROM apartment WHERE name = 'Dúplex Las Sierras'), DATEADD('DAY', -30, CURRENT_DATE), DATEADD('DAY', -23, CURRENT_DATE), 'Familia Herrera', 5, 20000, 100000, 700000, 200000, 500000, 'COMPLETE', NULL),
((SELECT id FROM apartment WHERE name = 'Dúplex Las Sierras'), CURRENT_DATE, DATEADD('DAY', 7, CURRENT_DATE), 'Roberto Álvarez', 6, 20000, 120000, 840000, 250000, 590000, 'ACTIVE', 'Ingresan hoy. Grupo de amigos.'),
((SELECT id FROM apartment WHERE name = 'Dúplex Las Sierras'), DATEADD('DAY', 15, CURRENT_DATE), DATEADD('DAY', 18, CURRENT_DATE), 'Valentina Torres', 4, 20000, 80000, 240000, 80000, 160000, 'PENDING', NULL),

-- Monoambiente El Mirador ($18.000 por persona)
((SELECT id FROM apartment WHERE name = 'Monoambiente El Mirador'), DATEADD('DAY', 30, CURRENT_DATE), DATEADD('DAY', 32, CURRENT_DATE), 'Ana Castro', 1, 18000, 18000, 36000, 10000, 26000, 'PENDING', NULL);
