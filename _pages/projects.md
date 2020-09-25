---
layout: archive
title: "Projects"
permalink: /projects/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

### Carrom Playing Robot
ITSP, 2016
- Built a carrom playing bot played the game of carrom. Given a picture of a carrom board, the bot will estimate the optimal location of the striker, as well as the power and angle of shot
- The mechanical component of the robot was built using Servo motors. We used a Raspberry Pi to capture image using a webcam, process it, as well as control the motors
- We used various image processing and CV techniques like Hough Transform, 2D projective point transformation and finally a constant depth assumption to get real world distances

### SAT Solver
Prof. Amitabha Sanyal, 2017
- Wrote a purely functional SAT solver which solved for a satisfying assignment to the given formula in Conjunctive Normal Form
- Implemented the famous DPLL algorithm along with Dynamic Largest Individual Sum(DLIS) heuristic
- Posed traditional logic problems like Sudoku and n-queens as satisfiability problems and solved them using our SAT solver

### IITB Open Dining
Prof. S. Sudarshan, 2017
- Created an application for students to allow eating at a dining hall other than their default, which allows greater flexibility to students. The students will pre-register to eat at a mess using the application
- Implemented various features like token-based login with "Remember me" option, ability to give rating as well as reviews for a dining hall
- The front-end was an android application with different views for student and contractor, while the back-end mainly consisted of Java Servlets and a PostgreSQL database
  
