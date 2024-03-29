import { Router } from "express";
import AUTHMiddleware from "../middlewares/AUTHMiddleware";
const requiredFields = require("../middlewares/requiredFieldsMiddleware");
const express = require("express");
const router: Router = express.Router();
const {
  registerClient,
  registerClinic,
  activateEmail,
  logIn,
  editClinic,
  editClient,
  getClientDetails,
  getClinicDetails,
} = require("../services/UsersService");

router.post(
  "/register-client",
  requiredFields([
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
    "repeatPassword",
  ]),
  async (req, res) => {
    try {
      const newClient = await registerClient(req.body);
      res.status(200).json(newClient);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.post(
  "/register-clinic",
  requiredFields([
    "name",
    "address",
    "phoneNumber",
    "email",
    "password",
    "repeatPassword",
  ]),
  async (req, res) => {
    try {
      const newClinic = await registerClinic(req.body);
      res.status(200).json(newClinic);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get("/validate-email/:email/:token", async (req, res) => {
  try {
    const token = await activateEmail(req.params.email, req.params.token);
    res.status(200).json(token);
  } catch (err) {
    console.error("Error while validating email: ", err);
    res.status(400).json({
      error: "Error!",
      message: " Could not validate this email!",
    });
  }
});

router.post(
  "/login",
  requiredFields(["email", "password"]),
  async (req, res) => {
    try {
      const token = await logIn(req.body);
      res.status(200).json(token);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.put(
  "/clinics/:clinicId",
  AUTHMiddleware("clinic"),
  requiredFields(["name", "address", "phoneNumber"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const clinicId = req.params.clinicId;

      const clinic = await editClinic(userId, clinicId, req.body);
      res.status(200).json(clinic);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.put(
  "/clients/:clientId",
  AUTHMiddleware("client"),
  requiredFields(["firstName", "lastName", "phoneNumber"]),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const clientId = req.params.clientId;

      const client = await editClient(userId, clientId, req.body);
      res.status(200).json(client);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/get-client-details",
  AUTHMiddleware("client"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const client = await getClientDetails(userId);
      res.status(200).json(client);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);

router.get(
  "/get-clinic-details",
  AUTHMiddleware("clinic"),
  async (req, res) => {
    try {
      const userId = req.user.id;

      const clinic = await getClinicDetails(userId);
      res.status(200).json(clinic);
    } catch (err) {
      console.error(err);
      res.status(err.status ?? 400).json({
        error: err.error ?? "Error!",
        message: err.message ?? "Something went wrong!",
      });
    }
  }
);
module.exports = router;
