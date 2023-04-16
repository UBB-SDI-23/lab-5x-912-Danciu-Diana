import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
	Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Author } from "../../models/Author";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

export const AllAuthors = () => {
	const [loading, setLoading] = useState(false);
	const [authors, setAuthors] = useState<Author[]>([]);
	const [minPrize, setMinPrize] = useState("");

	const handleMinPrizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMinPrize(event.target.value);
	};

	const handleFilter = () => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/author?min_prize=${minPrize}`)
			.then((response) => response.json())
			.then((data) => {
				setAuthors(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		fetch(`${BACKEND_API_URL}/author`)
			.then((response) => response.json())
			.then((data) => {
				setAuthors(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	}, []);

	return (
		<Container>
			<h1>All authors</h1>

			{loading && <CircularProgress />}
			{!loading && authors.length === 0 && <p>No authors found</p>}
			{!loading && (
				<div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/author/add`}>
						<Tooltip title="Add a new author" arrow>
							<AddIcon color="primary" />
						</Tooltip>
					</IconButton>
					<div style={{ display: "flex", alignItems: "center" }}>
						<label htmlFor="min-prize-filter" style={{ marginRight: "1rem" }}>
							Filter by minimum prize:
						</label>
						<input
							type="number"
							id="min-prize-filter"
							value={minPrize}
							onChange={handleMinPrizeChange}
							style={{ marginRight: "1rem" }}
						/>
						<Button variant="contained" onClick={handleFilter}>
							Filter
						</Button>
					</div>
				</div>
			)}
			{!loading && authors.length > 0 && (
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
							    <TableCell>#</TableCell>
								<TableCell align="right">First name</TableCell>
								<TableCell align="right">Last name</TableCell>
								<TableCell align="right">No of prizes</TableCell>
								<TableCell align="right">No of books</TableCell>
								<TableCell align="right">Date of birth</TableCell>
								<TableCell align="center">Operations</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{authors.map((author, index) => (
								<TableRow key={author.id}>
									<TableCell component="th" scope="row">
										{index + 1}
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/author/${author.id}/details`} title="View author details">
											{author.first_name}
										</Link>
									</TableCell>
									<TableCell component="th" scope="row">
										<Link to={`/author/${author.id}/details`} title="View author details">
											{author.last_name}
										</Link>
									</TableCell>
									<TableCell align="right">{author.no_of_prizes}</TableCell>
									<TableCell align="right">{author.no_of_books}</TableCell>
									<TableCell align="right">{new Date(author.date_of_birth).toLocaleDateString()}</TableCell>
									<TableCell align="right">
										<IconButton
											component={Link}
											sx={{ mr: 3 }}
											to={`/author/${author.id}/details`}>
											<Tooltip title="View author details" arrow>
												<ReadMoreIcon color="primary" />
											</Tooltip>
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/author/${author.id}/edit`}>
											<EditIcon />
										</IconButton>

										<IconButton component={Link} sx={{ mr: 3 }} to={`/author/${author.id}/delete`}>
											<DeleteForeverIcon sx={{ color: "red" }} />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</Container>
	);
};