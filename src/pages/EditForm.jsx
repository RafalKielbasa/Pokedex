import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import { css, styled } from '@mui/material'
import { useSnackbar } from 'notistack'

import { JsonEditPokemon } from '../api/JsonEditPokemon'
import { JsonAddPokemon } from '../api/JsonAddPokemon'

const Container = styled('div')(
	({ theme }) =>
		css`
			display: flex;
			flex-direction: column;
			align-items: center;
			background-color: ${theme.palette.background.contrast};
			transition: 500ms all;
			padding: 20px;
		`
)

const PokemonCard = styled('div')(
	({ theme }) =>
		css`
			max-width: 50vw;
			min-height: 50vh;
			margin: 20px;
			background-color: ${theme.palette.background.default};
			padding: 20px;
			border-radius: 10px;
			&:hover {
				transform: scale(1.01);
			}
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			@media screen and (max-width: 600px) {
				flex-direction: column;
			}
		`
)

const ImageContainer = styled('div')(
	css`
		width: 100%;
		height: 200px;
		display: flex;
		justify-content: center;
		@media screen and (max-width: 600px) {
			width: 100px;
			height: 100px;
		}
	`
)

const Image = styled('img')(
	css`
		width: 200px;
		height: 200px;
		@media screen and (max-width: 600px) {
			width: 100px;
			height: 100px;
		}
	`
)

const ContentContainer = styled('div')(
	css`
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
	`
)

const InfoContainer = styled('div')(
	css`
		width: 100%;
		height: 35%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		@media screen and (max-width: 600px) {
			margin: 0px;
			padding: 0px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
		}
	`
)

const InfoBox = styled('div')(
	css`
		margin: 0;
		padding: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		@media screen and (max-width: 600px) {
			margin: 0;
			padding: 0;
			width: 50%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	`
)

const MiniTitle = styled('span')(
	css`
		font-size: 15px;
		font-family: cursive;
		font-weight: lighter;
		@media screen and (max-width: 600px) {
			font-size: 12px;
		}
	`
)

const SubmitButton = styled('button')(
	css`
		border: 1px solid red;
		width: 20vw;
		color: red;
		cursor: pointer;
		font-size: 20px;
	`
)

const SaveButton = styled('button')(
	({ disp }) =>
		css`
			border: 1px solid red;
			width: 20vw;
			margin-top: 5px;
			color: red;
			cursor: pointer;
			font-size: 20px;
			display: ${disp === true ? null : 'none'};
		`
)

const EditForm = () => {
	const location = useLocation()
	const pokemonData = location.state?.pokemonData
	const { enqueueSnackbar } = useSnackbar()
	const [newValues, setNewValues] = useState(null)
	const [disp, setDisp] = useState(false)

	const initialValues = {
		pokemonName: pokemonData?.name || '',
		weight: pokemonData?.weight || '',
		ability: pokemonData?.ability || '',
		height: pokemonData?.height || '',
		baseExperience: pokemonData?.base_experience || '',
	}

	const handleSubmit = values => {
		setNewValues(values)
		setDisp(!disp)
	}

	const editPokemon = () => {
		handleSnackBar('Edited old Card', 'success')
		JsonEditPokemon(pokemonData, newValues)
	}

	const addNewPokemon = () => {
		handleSnackBar('added new Card', 'success')
		JsonAddPokemon(pokemonData, newValues)
	}

	const handleSnackBar = (text, type) => {
		enqueueSnackbar(text, { variant: type })
	}
	return (
		<Container>
			<Formik initialValues={initialValues} onSubmit={handleSubmit}>
				{() => (
					<Form>
						<PokemonCard>
							<ImageContainer>
								<Image src={pokemonData?.sprite} />
							</ImageContainer>
							<ContentContainer>
								<InfoBox>
									<MiniTitle>Name</MiniTitle>
									<Field type='text' name='pokemonName' />
								</InfoBox>

								<InfoContainer>
									<InfoBox>
										<MiniTitle>Weight</MiniTitle>
										<Field type='number' name='weight' />
									</InfoBox>
									<InfoBox>
										<MiniTitle>Abilities</MiniTitle>
										<Field type='text' name='ability' />
									</InfoBox>
									<InfoBox>
										<MiniTitle>Height</MiniTitle>
										<Field type='number' name='height' />
									</InfoBox>
									<InfoBox>
										<MiniTitle>BaseExperience</MiniTitle>
										<Field type='number' name='baseExperience' />
									</InfoBox>
								</InfoContainer>
							</ContentContainer>
							<SubmitButton type='submit'>
								zapisz zmiany w formularzu{' '}
							</SubmitButton>
						</PokemonCard>
					</Form>
				)}
			</Formik>
			<SaveButton onClick={addNewPokemon} type='submit' disp={disp}>
				save as new
			</SaveButton>
			<SaveButton onClick={editPokemon} type='submit' disp={disp}>
				Edit
			</SaveButton>
		</Container>
	)
}

export default EditForm
