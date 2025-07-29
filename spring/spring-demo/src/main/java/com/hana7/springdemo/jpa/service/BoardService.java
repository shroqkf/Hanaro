package com.hana7.springdemo.jpa.service;

import java.util.List;

import com.hana7.springdemo.jpa.dto.BoardRequestDTO;
import com.hana7.springdemo.jpa.dto.BoardResponseDTO;

public interface BoardService {
	List<BoardResponseDTO> getPageList(int page, int countPerPage);

	BoardResponseDTO getBoard(int id);

	BoardResponseDTO createBoard(BoardRequestDTO requestDTO);

	BoardResponseDTO changeBoard(BoardRequestDTO requestDTO);

	void removeBoard(int id);
}
