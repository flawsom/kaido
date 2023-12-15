import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "./AnimeInfo.css";
import { Link } from "react-router-dom";
import { FaEye, FaHeart, FaMedal, FaPlayCircle, FaPlus, FaInstagram } from "react-icons/fa";
import Share from "../Share/Share";
import { getRandomAnime } from "../../api/jikan";
import LazyImage from "../../utils/LazyImage";
export default function Details() {
  const { data, isLoading } = getRandomAnime();
  const animeObj = data?.data;
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);
  const genre = animeObj?.genres.map((genre) => {
    return (
      <Link
        className="genre-button"
        key={genre.mal_id}
        to={`/grid/genre?id=${genre.mal_id}&name=${genre.name}`}
      >
        {genre.name}
      </Link>
    );
  });

  const licensors = animeObj?.licensors?.map((licensor) => {
    return (
      <Link
        key={licensor.name}
        to={`/grid/${licensor.mal_id}/${licensor.name}`}
      >
        {licensor.name + ", "}
      </Link>
    );
  });

  const producers = animeObj?.producers?.map((producer) => {
    return (
      <Link
        key={producer.name}
        to={`/grid/${producer.mal_id}/${producer.name}`}
      >
        {producer.name + ", "}
      </Link>
    );
  });

  const studios = animeObj?.studios?.map((studio) => {
    return (
      <Link key={studio.name} to={`/grid/${studio.mal_id}/${studio.name}`}>
        {studio.name + ", "}
      </Link>
    );
  });

  const synonyms = animeObj?.title_synonyms?.map((title) => (
    <span key={title}>{title},</span>
  ));

  const openInstagram = () => {
    // Open Instagram page in a new tab/window
    window.open("https://www.instagram.com/", "_blank");
  };

  return !isLoading ? (
    <div className="details-container">
      <div className="details-header">
        <div className="details-header-primary">
          <lazy
            className="details-container-background"
            src={
              animeObj.images.webp.image_url ||
              animeObj.images.webp.large_image_url ||
              animeObj.images.webp.large_small_url ||
              animeObj.images.jpg.large_image_url ||
              "NA"
            }
            isAnimated={false}
          />
          <div className="anime-details d-flex">
            <LazyImage
              className="anime-details-poster"
              src={
                animeObj.images.webp.image_url ||
                animeObj.images.webp.large_image_url ||
                animeObj.images.webp.large_small_url
              }
              isAnimated={false}
            />

            <div className="anime-details-content d-flex-fd-column">
              <h1 className="title-large">
                {animeObj.title || animeObj.title_english}
              </h1>
              <div className="anime-statistics-tiles-wrapper d-flex a-center">
                <span className="anime-statistics-tile d-flex a-center j-center">
                  {window.innerWidth < 450
                    ? animeObj.rating.slice(0, 6)
                    : animeObj.rating || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaMedal /> - {animeObj.rank || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaHeart /> -{animeObj.favorites || "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  <FaEye /> -{animeObj.members | "NA"}
                </span>
                <span className="anime-statistics-tile d-flex a-center j-center">
                  HD
                </span>
              </div>
              <div className="button-wrapper">
                <Link
                  to={`/watch?name=${animeObj.title || animeObj.title_english}`}
                  className="btn-primary hero-button"
                >
                  <FaPlayCircle size={12} /> Watch Now
                </Link>
                <button
                className="btn-secondary hero-button"
                onClick={openInstagram} // Added Instagram functionality
                onMouseEnter={() => {
                  // Show overlay box logic here on hover
                  // For example, display a tooltip or overlay
                  // This could involve manipulating the DOM or using CSS classes for visibility
                  // Add tooltip or overlay functionality here
                }}
                onMouseLeave={() => {
                  // Hide overlay box logic here when hover ends
                }}
              >
                <FaInstagram size={20} />
                <span className="tooltip-text"></span> {/* Example for tooltip */}
                {/* The above line is an example. You'd need to implement tooltip/overlay functionality */}
              </button>
              </div>
              <p>
                {descIsCollapsed
                  ? animeObj.synopsis?.slice(0, 350) + "..."
                  : animeObj.synopsis}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setDescIsCollapsed((prev) => !prev)}
                >
                  [ {descIsCollapsed ? "More" : "Less"} ]
                </span>
              </p>
              <Share style={{ padding: 0, margin: 0 }} />
            </div>
          </div>
        </div>

        <div className="details-header-secondary">
          <div className="details-header-statistics">
            <p>
              <b>Japanese:</b> {animeObj.title_japanese}
            </p>
            <p>
              <b>Synonyms:</b> {synonyms.length > 0 ? synonyms : "N/A"}
            </p>
            <p>
              <b>Aired:</b>
              {animeObj.aired.string || "?"}
            </p>
            <p>
              <b>Duration:</b> {animeObj.duration || "NA"}
            </p>
            <p>
              <b>Score:</b> {animeObj.score}
            </p>
            <p>
              <b>Status:</b> {animeObj.status}
            </p>
            <p>
              <b>Premiered:</b> {animeObj.season || "Season: ?" + " "}
              {animeObj.year || "Year: ?"}
            </p>
          </div>
          <div className="details-header-genre">
            <p>
              <b>Genre: </b>
              {genre}
            </p>
          </div>
          <div className="details-header-studio">
            <p>
              <b>Producers: </b>
              {producers}
            </p>
            <p>
              <b>Licensors: </b>
              {licensors}
            </p>
            <p>
              <b>Studios: </b>
              {studios}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <LoadingSpinner />
  );
}
