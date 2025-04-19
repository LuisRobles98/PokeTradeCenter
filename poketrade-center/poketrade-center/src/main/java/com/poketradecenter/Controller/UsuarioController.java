package com.poketradecenter.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@Controller
public class UsuarioController {
	
	@Autowired
	private IUsuarioService usuarioService;
	
    @PostMapping("/usuario")
    public void guardarUsuario(Usuario usuario) {
        usuarioService.guardarUsuario(usuario);
    }
}