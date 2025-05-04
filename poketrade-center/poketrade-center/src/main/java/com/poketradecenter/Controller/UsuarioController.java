package com.poketradecenter.Controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    @GetMapping("/usuario" + "/{correo}")
    public List<Usuario> recuperarUsuarioPorEmail(@PathVariable String correo) {
    	CriteriosUsuario criterios = new CriteriosUsuario();
    	criterios.setEmail(correo);
    	List<Usuario> usuarios = usuarioService.recuperarUsuarioPorCriterios(criterios);
    	return usuarios;
    }
    
    @GetMapping("/usuario" + "/{correo}" + "/{password}")
    public List<Usuario> recuperarUsuarioPorEmailYPassword(@PathVariable String correo, @PathVariable String password) {
    	CriteriosUsuario criterios = new CriteriosUsuario();
    	criterios.setEmail(correo);
    	criterios.setPassword(password);
    	List<Usuario> usuarios = usuarioService.recuperarUsuarioPorCriterios(criterios);
    	return usuarios;
    }
}