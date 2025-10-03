package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
    public void crearUsuario(@RequestBody Usuario usuario) {
        usuarioService.crearUsuario(usuario);
    }
    
    @PutMapping("/usuario")
    public void actualizarUsuario(@RequestBody Usuario usuario) {
    	usuarioService.actualizarUsuario(usuario);
    }
    
    @GetMapping("/usuario")
    public List<Usuario> recuperarUsuarioPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosUsuario criterios = usuarioService.crearCriteriosUsuarioParams(params);
        List<Usuario> usuarios = usuarioService.recuperarUsuarioPorCriterios(criterios);
        return usuarios;
    }
}