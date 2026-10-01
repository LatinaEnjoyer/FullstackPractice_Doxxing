package com.thukuna.fullstackpractice.exception;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgumentException(IllegalArgumentException ex) {
        ProblemDetail pd = ProblemDetail.forStatus(409);
        pd.setTitle("Illegal Argument Exception");
        pd.setDetail(ex.getMessage());
        return pd;
    }

    @ExceptionHandler(NotFoundException.class)
    public ProblemDetail handleNotFoundException(NotFoundException ex) {
        ProblemDetail pd = ProblemDetail.forStatus(404);
        pd.setTitle("Not Found Exception");
        pd.setDetail(ex.getMessage());
        return pd;
    }
}
