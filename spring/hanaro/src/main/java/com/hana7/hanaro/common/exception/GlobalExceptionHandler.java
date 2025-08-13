package com.hana7.hanaro.common.exception;

import com.hana7.hanaro.common.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDTO> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return new ResponseEntity<>(new ErrorResponseDTO("유효성 검증에 실패했습니다.", errors.toString()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponseDTO> handleGlobalException(GlobalException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO(ex.getMessage(), String.valueOf(ex.getHttpStatus().value())), ex.getHttpStatus());
    }

    @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class)
    public ResponseEntity<ErrorResponseDTO> handleAccessDeniedException(org.springframework.security.access.AccessDeniedException ex) {
        return new ResponseEntity<>(new ErrorResponseDTO("접근 권한이 없습니다.", "403 FORBIDDEN"), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleGeneralException() {
        return new ResponseEntity<>(new ErrorResponseDTO("예기치 못한 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.toString()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
