import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import Button from '../../components/Button';
import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: 'rocketseat/unform',
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleRemove = index => {
    const { repositories } = this.state;

    this.setState({
      repositories: repositories.filter((_, i) => i !== index),
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const { newRepo, repositories } = this.state;

    const existRepo = repositories.filter(item => item.name === newRepo);
    if (existRepo.length > 0 || newRepo === '') {
      this.setState({ newRepo: '' });
      return;
    }

    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
      });
    } catch (error) {
      alert('Repositório não encontrado!');
    } finally {
      this.setState({
        newRepo: '',
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, repositories, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            <FaPlus color="#FFFFFF" size={14} />
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((repository, index) => (
            <li key={String(index)}>
              <span>{repository.name}</span>
              <div>
                <Button error onClick={() => this.handleRemove(index)}>
                  Remover
                </Button>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
