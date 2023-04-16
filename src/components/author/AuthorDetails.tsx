import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Author } from "../../models/Author";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";

export const AuthorDetails = () => {
	const { authorId } = useParams();
	const [author, setAuthor] = useState<Author>();
    const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchAuthor = async () => {
			try {
				const response = await axios.get(`${BACKEND_API_URL}/author/${authorId}`);
				setAuthor(response.data);
				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setError(error);
				setIsLoading(false);
			}
		};
		fetchAuthor();
	}, [authorId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/author`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Author's Details</h1>
					<p>Author's First Name: {author?.first_name}</p>
					<p>Author's Last Name: {author?.last_name}</p>
					<p>Author's No Of Prizes: {author?.no_of_prizes}</p>
					<p>Author's No Of Books: {author?.no_of_books}</p>
					<p>Author's Date Of Birth: {author?.date_of_birth.toLocaleString()}</p>
					<p>Author's books:</p>
					<ul>
						{author?.book?.map((book) => (
							<li key={book.id}>{book.title}</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</Container>
	);
};
