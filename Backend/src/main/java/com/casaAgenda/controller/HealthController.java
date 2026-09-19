package com.casaAgenda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoint publico y sin autenticacion pensado para servicios externos de
 * "keep alive" (ej. cron-job.org, UptimeRobot) que hacen ping periodico
 * para evitar que Render duerma la instancia por inactividad.
 * No expone ningun dato de la app, solo confirma que el servicio esta arriba.
 */
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("OK");
    }
}
