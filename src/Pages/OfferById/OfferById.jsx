import "./OfferById.css";

// react-router-dom

import { useParams } from "react-router";

// Components

import { OfferCard } from "../../components/OfferCard/OfferCard";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";
import { PostComment } from "../../components/PostComment/PostComment";
import { CommentsCard } from "../../components/CommentCard/CommentCard";
import { PostOffer } from "../../components/PostOffer/PostOffer";

// Contexts

import { useAuth } from "../../contexts/AuthContext";

// Fetchs

import { useGetOfferById } from "../../services/api";

export const OfferById = () => {
  // Document Title
  document.title = "GodLinks: Oferta ";

  const { id } = useParams();
  const { token } = useAuth();
  const { offers, loading, error, refresh } = useGetOfferById(id, token);

  if (loading) return <p>cargando ofertas...</p>;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <section className="body">
        {offers.offerInfo?.map((offerInfo, index) => (
          <OfferCard key={index} offer={offerInfo} />
        ))}

        {offers.offerInfo?.map((offerInfo, i) => (
          <PostComment key={i} id={id} refresh={refresh} offer={offerInfo} />
        ))}

        <section className="comments-body">
          <ul className="comments-list">
            {offers.comments?.map((comment) => (
              <li key={comment.id}>
                <CommentsCard comment={comment} refresh={refresh} />
              </li>
            ))}
          </ul>
        </section>
      </section>

      <PostOffer />
    </>
  );
};
