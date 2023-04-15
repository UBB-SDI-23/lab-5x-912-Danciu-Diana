import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppHome } from "./components/AppHome";
import { AppMenu } from "./components/AppMenu";
import { AllAuthors } from "./components/author/AllAuthors";
import { AuthorDetails } from "./components/author/AuthorDetails";
import { AuthorDelete } from "./components/author/AuthorDelete";
import { AuthorAdd } from "./components/author/AuthorAdd";
import { AuthorUpdate } from "./components/author/AuthorUpdate";

function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />

				<Routes>
					<Route path="/" element={<AppHome />} />
					<Route path="/author" element={<AllAuthors />} />
					<Route path="/author/:authorId/details" element={<AuthorDetails />} />
					<Route path="/author/:authorId/edit" element={<AuthorUpdate />} />
					<Route path="/author/:authorId/delete" element={<AuthorDelete />} />
					<Route path="/author/add" element={<AuthorAdd />} />
				</Routes>
			</Router>
		</React.Fragment>
	);
}

export default App;
