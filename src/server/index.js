import "dotenv/config";
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import { renderJSXToClientJSX, stringifyJSX } from "./utils/index.js";
import React from "react";

export const getApp = (Router, HTML) => {
  const app = express();
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host}`);
      if (url.pathname === "/") {
        const { pipe } = renderToPipeableStream(<HTML />, {
          bootstrapModules: ["src/client/index.js"],
          onShellReady() {
            res.setHeader("content-type", "text/html");
            pipe(res);
          },
        });
      } else {
        const clientJSX = await renderJSXToClientJSX(
          <Router
            componentName={url.pathname.slice(1)}
            props={req.body.props}
          />
        );
        const clientJSXString = JSON.stringify(clientJSX, stringifyJSX);
        res.setHeader("Content-Type", "application/json");
        res.end(clientJSXString);
      }
    } catch (err) {
      console.error(err);
      return res.status(err.status || 500).json({ error: err });
    }
  });

  return app;
};

export { RCC } from "./components/rcc.js";
