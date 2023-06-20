import { useGetOffers } from "../hooks/useGetOffers";
import { useGetOffersWithToken } from "../hooks/useGetOffersWithToken";
import { useGetDataUser } from "../hooks/useGetDataUser";

export const useGetDailyOffers = () =>
  useGetOffers(`${import.meta.env.VITE_BACKEND}offers?filter=daily`);

export const useGetAllOffers = () =>
  useGetOffers(`${import.meta.env.VITE_BACKEND}offers?filter=all`);

export const useGetOffersByVotes = () =>
  useGetOffers(`${import.meta.env.VITE_BACKEND}offers?filter=by-votes`);

export const useGetMyFavoriteOffers = (token) =>
  useGetOffersWithToken(`${import.meta.env.VITE_BACKEND}favorites`, token);

export const useGetOfferById = (id, token) =>
  useGetOffersWithToken(`${import.meta.env.VITE_BACKEND}offer/${id}`, token);

export const useGetMyData = (token) =>
  useGetDataUser(`${import.meta.env.VITE_BACKEND}user`, token);

export const useGetUserInfo = (token, id) =>
  useGetDataUser(`${import.meta.env.VITE_BACKEND}user/${id}`, token);

// USERS

export const registerUserService = async ({ email, password, user }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}user`, {
    method: "POST",
    body: JSON.stringify({ email, password, user }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const logInUserService = async ({ email, password }) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND}login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const RecoverPasswordService = async ({ email }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}password/recover`,
    {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};

export const ResetPasswordService = async ({ recoverCode, newPassword }) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}password/recover`,
    {
      method: "POST",
      body: JSON.stringify({ recoverCode, newPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

// OFFERS

export const addFavoriteService = async (token, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND}favorite/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: token,
      },
    }
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }
};
