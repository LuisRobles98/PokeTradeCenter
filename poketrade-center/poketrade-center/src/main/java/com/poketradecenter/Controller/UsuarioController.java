package com.poketradecenter.Controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.poketradecenter.Clase.CriteriosUsuario;
import com.poketradecenter.Clase.Usuario;
import com.poketradecenter.Service.interfaces.IUsuarioGestionService;
import com.poketradecenter.Service.interfaces.IUsuarioService;
import com.poketradecenter.Utilities.interfaces.ICrearCriterios;

@RestController
public class UsuarioController {
	
	@Autowired
	private IUsuarioService usuarioService;
	
	@Autowired
	private ICrearCriterios crearCriterios;
	
	
    @PostMapping("/usuario")
    public void crearUsuario(@RequestBody Usuario usuario) {
        usuarioService.crearUsuario(usuario);
    }
    
    @PutMapping("/usuario")
    public ResponseEntity<?> actualizarUsuario(@RequestBody Usuario usuario) {
    	try {
    		usuarioService.actualizarUsuario(usuario);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
    
    @GetMapping("/usuario")
    public List<Usuario> recuperarUsuarioPorCriterios(@RequestParam Map<String, String> params) {
        CriteriosUsuario criterios = crearCriterios.crearCriteriosUsuarioParams(params);
        return usuarioService.recuperarUsuarioPorCriterios(criterios);
    }
    
    @DeleteMapping("/usuario")
    public ResponseEntity<?> eliminarUsuario(@RequestBody Usuario usuario) {
        try {
        	usuarioService.eliminarUsuario(usuario);
    		return ResponseEntity.ok().build();
    	}catch(RuntimeException e) {
    		return ResponseEntity.badRequest().body(e.getMessage());
    	}
    }
}