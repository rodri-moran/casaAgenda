package com.casaAgenda.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// El CORS de la aplicación se configura en SecurityConfig junto con la
// autenticación, para que ambas piezas usen el mismo origen permitido
// y no queden dos configuraciones de CORS independientes.
@Configuration
public class WebConfig implements WebMvcConfigurer {
}
