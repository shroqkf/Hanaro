package org.example.hello;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@SpringBootApplication
public class HelloApplication {

	public static void main(String[] args) {
		new TomcatServletWebServerFactory().getWebServer(servletContext -> {
			servletContext.addServlet("hello", new HttpServlet() {
				@Override
				public void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
					res.setStatus(HttpStatus.OK.value());

					PrintWriter writer = res.getWriter();
					String requestURI = req.getRequestURI();
					if (requestURI.equals("/hello-servlet")) {
						res.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_PLAIN_VALUE);
						// super.service(req, res);
						String name = req.getParameter("name");
						writer.println("Hello " + name + "!");
					} else if (requestURI.equals("/login")) {
						// res.setHeader(HttpHeaders.CONTENT_TYPE, MediaType.TEXT_HTML_VALUE);
						res.setContentType("text/html");
						writer.println("<form>");
						writer.println("<input name='email'>");
						writer.println("<button type='submit'>Login</button>");
						writer.println("</form>");
					} else {
						res.setStatus(HttpStatus.NOT_FOUND.value());
						writer.println("404 Not Found");
					}
				}
			}).addMapping("/*");
			// }).addMapping("/hello-servlet");
		}).start();
		// SpringApplication.run(DemoApplication.class, args);
	}

}
