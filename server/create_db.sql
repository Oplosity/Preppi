--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-05-14 10:47:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16415)
-- Name: quizzes; Type: TABLE; Schema: preppi_schema; Owner: -
--

CREATE SCHEMA preppi_schema;

CREATE TABLE preppi_schema.quizzes (
    quiz_id bigint NOT NULL,
    quiz_name text NOT NULL,
    quiz_desc text,
    questions jsonb NOT NULL,
    subject text NOT NULL
);


--
-- TOC entry 4796 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE quizzes; Type: COMMENT; Schema: preppi_schema; Owner: -
--

COMMENT ON TABLE preppi_schema.quizzes IS 'Table for storing quiz data';


--
-- TOC entry 215 (class 1259 OID 16414)
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE; Schema: preppi_schema; Owner: -
--

CREATE SEQUENCE preppi_schema.quizzes_quiz_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4797 (class 0 OID 0)
-- Dependencies: 215
-- Name: quizzes_quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: preppi_schema; Owner: -
--

ALTER SEQUENCE preppi_schema.quizzes_quiz_id_seq OWNED BY preppi_schema.quizzes.quiz_id;


--
-- TOC entry 219 (class 1259 OID 16432)
-- Name: scores; Type: TABLE; Schema: preppi_schema; Owner: -
--

CREATE TABLE preppi_schema.scores (
    user_id bigint NOT NULL,
    quiz_id bigint NOT NULL,
    score bigint NOT NULL,
    CONSTRAINT unique_user_quiz UNIQUE (user_id, quiz_id)
);


--
-- TOC entry 218 (class 1259 OID 16424)
-- Name: users; Type: TABLE; Schema: preppi_schema; Owner: -
--

CREATE TABLE preppi_schema.users (
    user_id bigint NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    email text NOT NULL,
    admin boolean NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 16423)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: preppi_schema; Owner: -
--

CREATE SEQUENCE preppi_schema.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4798 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: preppi_schema; Owner: -
--

ALTER SEQUENCE preppi_schema.users_user_id_seq OWNED BY preppi_schema.users.user_id;


--
-- TOC entry 4640 (class 2604 OID 16418)
-- Name: quizzes quiz_id; Type: DEFAULT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.quizzes ALTER COLUMN quiz_id SET DEFAULT nextval('preppi_schema.quizzes_quiz_id_seq'::regclass);


--
-- TOC entry 4641 (class 2604 OID 16427)
-- Name: users user_id; Type: DEFAULT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.users ALTER COLUMN user_id SET DEFAULT nextval('preppi_schema.users_user_id_seq'::regclass);


--
-- TOC entry 4643 (class 2606 OID 16422)
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (quiz_id);


--
-- TOC entry 4645 (class 2606 OID 16431)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4646 (class 2606 OID 16440)
-- Name: scores quiz_id; Type: FK CONSTRAINT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.scores
    ADD CONSTRAINT quiz_id FOREIGN KEY (quiz_id) REFERENCES preppi_schema.quizzes(quiz_id) NOT VALID;


--
-- TOC entry 4799 (class 0 OID 0)
-- Dependencies: 4646
-- Name: CONSTRAINT quiz_id ON scores; Type: COMMENT; Schema: preppi_schema; Owner: -
--

COMMENT ON CONSTRAINT quiz_id ON preppi_schema.scores IS 'This is referencing to a quizzes id.';


--
-- TOC entry 4647 (class 2606 OID 16435)
-- Name: scores user_id; Type: FK CONSTRAINT; Schema: preppi_schema; Owner: -
--

ALTER TABLE ONLY preppi_schema.scores
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES preppi_schema.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4800 (class 0 OID 0)
-- Dependencies: 4647
-- Name: CONSTRAINT user_id ON scores; Type: COMMENT; Schema: preppi_schema; Owner: -
--

COMMENT ON CONSTRAINT user_id ON preppi_schema.scores IS 'This is an user accounts primary key';


-- Completed on 2024-05-14 10:47:49

--
-- PostgreSQL database dump complete
--

