package com.hana7.springdemo.jpa.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.hana7.springdemo.jpa.dto.BoardDetailResponseDTO;
import com.hana7.springdemo.jpa.dto.BoardRequestDTO;
import com.hana7.springdemo.jpa.dto.BoardResponseDTO;
import com.hana7.springdemo.jpa.dto.PageResponseDTO;
import com.hana7.springdemo.jpa.dto.ReplyResponseDTO;
import com.hana7.springdemo.jpa.entity.Board;
import com.hana7.springdemo.jpa.entity.BoardContent;
import com.hana7.springdemo.jpa.entity.Reply;
import com.hana7.springdemo.jpa.repository.BoardRepository;

@Service
public class BoardServiceImpl implements BoardService {
	private final BoardRepository repository;

	public BoardServiceImpl(BoardRepository repository) {
		this.repository = repository;
	}

	@Override
	public List<BoardResponseDTO> getPageList(int page, int countPerPage) {
		Page<Board> results = repository.findAll(
			PageRequest.of(page - 1, countPerPage, Sort.by(Sort.Order.desc("id"))));

		return new PageResponseDTO<>(results, BoardServiceImpl::toDTO).getDtoList();
	}

	@Override
	public BoardResponseDTO getBoard(int id) {
		Board board = repository.findById(id).orElseThrow();
		return toDetailDTO(board);
	}

	@Override
	public BoardResponseDTO createBoard(BoardRequestDTO requestDTO) {
		Board board = toEntity(requestDTO);
		board.setContent(new BoardContent(requestDTO.getContent()));
		return toDTO(repository.save(board));
	}

	@Override
	public BoardResponseDTO changeBoard(BoardRequestDTO requestDTO) {
		Board board = repository.findById(requestDTO.getId()).orElseThrow();
		board.setTitle(requestDTO.getTitle());
		board.setWriter(requestDTO.getWriter());
		board.getContent().setContent(requestDTO.getContent());

		return toDetailDTO(repository.save(board));
	}

	@Override
	public void removeBoard(int id) {
		repository.deleteById(id);
	}

	public static Board toEntity(BoardRequestDTO dto) {
		return Board.builder()
			.id(dto.getId())
			.title(dto.getTitle())
			.writer(dto.getWriter())
			.build();
	}

	public static BoardResponseDTO toDTO(Board board) {
		return BoardResponseDTO.builder()
			.id(board.getId())
			.title(board.getTitle())
			.writer(board.getWriter())
			.hit(board.getHit())
			// .content(board.getContent().getContent())
			.createdAt(board.getCreatedAt())
			.updatedAt(board.getUpdatedAt())
			.build();
	}

	public static BoardDetailResponseDTO toDetailDTO(Board board) {
		return BoardDetailResponseDTO.builder()
			.id(board.getId())
			.title(board.getTitle())
			.writer(board.getWriter())
			.hit(board.getHit())
			.content(board.getContent().getContent())
			.createdAt(board.getCreatedAt())
			.updatedAt(board.getUpdatedAt())
			.replies(board.getReplies().stream()
				.map(BoardServiceImpl::toReplyDTO)
				.toList()
			)
			.build();
	}

	public static ReplyResponseDTO toReplyDTO(Reply reply) {
		return ReplyResponseDTO.builder()
			.id(reply.getId())
			.reply(reply.getReply())
			.replyer(reply.getReplyer())
			.board(toDTO(reply.getBoard()))
			.build();
	}
}
