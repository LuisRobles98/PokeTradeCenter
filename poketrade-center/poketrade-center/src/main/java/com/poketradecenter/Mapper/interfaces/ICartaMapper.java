package com.poketradecenter.Mapper.interfaces;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ICartaMapper {
	Integer recuperarTotalCartasPorExpansion(Integer expansionId);
}