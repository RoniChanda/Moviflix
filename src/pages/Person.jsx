import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import "./Person.css";
import Container from "../components/ui/Container";

export default function Person() {
  const [person, setPerson] = useState();
  const { id } = useParams();
  const { loadPerson } = useHttp();

  useEffect(() => {
    loadPerson(id).then((data) => setPerson(data));
  }, [id]);

  return (
    <Container className="person">
      {person && (
        <div className="person_content">
          <img
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${person.profile_path}`}
            alt={person.name}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/blank_pp.png";
            }}
          />
          <div className="person_details">
            <h1>{person.name}</h1>
            <p>
              {person.birthday}
              {person.deathday ? " - " + person.deathday : ""}
            </p>
            <p>{person.place_of_birth}</p>
          </div>
          <p className="person_bio">{person.biography}</p>
        </div>
      )}
    </Container>
  );
}
