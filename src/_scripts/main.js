// Main javascript entry point
// Should handle bootstrapping/starting application

"use strict";

import "core-js";
import "regenerator-runtime/runtime";
import $ from "jquery";
import { Link } from "../_modules/link/link";
import createBarChart from "./_charts";

console.log(createBarChart);
$(() => {
  new Link(); // Activate Link modules logic
  console.log("Welcome to Yeogurt!");
  createBarChart("#county-homicides", "homicides_total");
  createBarChart("#harvard-park-homicides", "homicides_harvard_park");
});
