import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Author } from "../../models/Author";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { debounce } from "lodash";
import { error } from "console";

export const AuthorUpdate = () => {
	const { authorId } = useParams();
	const navigate = useNavigate();

	const [author, setAuthor] = useState<Author>({
		id: 0,
		first_name: "",
        last_name: "",
        no_of_prizes: 0,
        no_of_books: 0,
        date_of_birth: new Date(),
        book: [], 
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuthor = async () => {
			try {
				const response = await axios.get(`${BACKEND_API_URL}/author/${authorId}`);
				setAuthor(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchAuthor();
	}, [authorId]);

	const updateAuthor = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		try {
			await axios.put(`${BACKEND_API_URL}/author/${author.id}`, author);
			navigate("/author");
		} catch (error: any) {
			if (error.response) {
			  console.log(error.response.data);
			} else {
			  console.log(error.message);
			}
		}
	};

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/author`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Update author</h1>
					<form onSubmit={updateAuthor}>
					<TextField
							id="first_name"
							label="FirstName"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							value={author.first_name}
							onChange={(event) => setAuthor({ ...author, first_name: event.target.value })}
						/>
						<TextField
							id="last_name"
							label="LastName"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							value={author.last_name}
							onChange={(event) => setAuthor({ ...author, last_name: event.target.value })}
						/>

                        <TextField
							id="no_of_prizes"
							label="NoOfPrizes"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							value={author.no_of_prizes}
							onChange={(event) => setAuthor({ ...author, no_of_prizes: parseInt(event.target.value), })}
						/>

                        <TextField
							id="no_of_books"
							label="NoOfBooks"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							value={author.no_of_books}
							onChange={(event) => setAuthor({ ...author, no_of_books: parseInt(event.target.value), })}
						/>

                       <TextField
                           id="date_of_birth"
                           label="Date of birth"
                           type="date"
                           variant="outlined"
                           fullWidth
                           sx={{ mb: 2 }}
                           value={author.date_of_birth instanceof Date ? author.date_of_birth.toISOString().substr(0, 10) : author.date_of_birth}
                           onChange={(event) => setAuthor({ ...author, date_of_birth: new Date(event.target.value) })}
                        />

                        <Button type="submit">Update Author</Button>
				</form>
			</CardContent>
			<CardActions>
				<IconButton component={Link} to={`/author/${authorId}/delete`} sx={{ ml: "auto" }}>
					<DeleteForeverIcon sx={{ color: "red" }} />
				</IconButton>
			</CardActions>
		</Card>
	</Container>
);
}
