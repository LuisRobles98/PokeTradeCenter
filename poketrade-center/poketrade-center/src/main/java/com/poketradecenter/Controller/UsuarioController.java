package com.poketradecenter.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IUsuarioService;

@RestController
public class UsuarioController {
	
	@Autowired
	private IUsuarioService usuarioService;
	
    @PostMapping("/usuario")
    public void guardarUsuario(@RequestBody Usuario usuario) {
        usuarioService.guardarUsuario(usuario);
    }
    
    @PutMapping("/usuario")
    public void actualizarUsuario(@RequestBody Usuario usuario) {
    	usuarioService.actualizarUsuario(usuario);
    }
    
    @GetMapping("/usuario")
    public List<Usuario> recuperarUsuarioPorCriterios(@RequestParam(required = false) String email, @RequestParam(required = false) String password,
    		@RequestParam(required = false) String nombre, @RequestParam(required = false) String icono, @RequestParam(required = false) String idJuego,
    		@RequestParam(required = false) Integer id) {
    	
    	CriteriosUsuario criterios = new CriteriosUsuario();
        criterios.setEmail(email);
        criterios.setPassword(password);
        criterios.setNombre(nombre);
        criterios.setIcono(icono);
        criterios.setIdJuego(idJuego);
        criterios.setId(id);
        List<Usuario> usuarios = usuarioService.recuperarUsuarioPorCriterios(criterios);
        return usuarios;
    }
}