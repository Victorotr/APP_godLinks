import "./AllOffers.css";

// Components

import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { OfferCard } from "../../components/OfferCard/OfferCard";
import { PostOffer } from "../../components/PostOffer/PostOffer";

// Contexts

import { useAuth } from "../../contexts/AuthContext";

// Fetchs

import { useGetAllOffers } from "../../services/api";

export const AllOffers = () => {
  // Document Title
  document.title = "Las mejores ofertas del mercado";

  const { token } = useAuth();
  const { offers, loading, error } = useGetAllOffers(token);

  if (loading) return <p>cargando ofertas...</p>;
  if (error) return <ErrorMessage/>;

  return (
    <>
      <section className="body">
        <ul className="offers-list">
          {offers.offers?.map((offer) => (
            <li key={offer.id}>
              <OfferCard offer={offer} />
            </li>
          ))}
        </ul>
      </section>

      <PostOffer />
    </>
  );
};
