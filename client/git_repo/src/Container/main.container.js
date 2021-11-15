import React, { Component } from 'react'

import { Button, Container, OutlinedInput, Backdrop, CircularProgress, InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Table from '../component/table.component';
import Detail from '../component/detail.component';

import * as Apis from '../lib/Apis';


class MainContainer extends Component {
  state = {
    loader: false,
    count: 0,
    limit: 10,
    page: 0,
    rowsperPageOptions: [5, 10, 25],
    searchQuery: '',
    repos: [],
    showDetail: false,
    selectedRepo: null,
    repoDetail: null

  }

  searchRepos = () => {
    if (!this.state.searchQuery) return;
    this.setState({
      showDetail: false
    })
    let url = `${Apis.APIS.SEARCH_REPOS}?q=${this.state.searchQuery}&page=${this.state.page + 1}&limit=${this.state.limit}`;
    const request = Apis.request('GET', url);
    if (request) {
      request
        .then(resp => {
          console.log(resp.data.data);
          if (resp.data && resp.data.data.repos) {
            this.setState({
              repos: resp.data.data.repos,
              count: resp.data.data.total
            })
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }

  async componentDidMount() {
    await this.searchRepos();
  }



  handleChangeRowsPerPage = async (e, newRow) => {
    e.preventDefault();
    console.log(e.target.value)
    await this.setState({
      limit: e.target.value
    })
    this.searchRepos();
  }

  handleChangePage = async (e, newPage) => {
    e.preventDefault();
    await this.setState({
      page: newPage
    })
    this.searchRepos();
  }

  handleRepoSearch = async (e) => {
    if (e.key === 'Enter') {
      console.log(e.target.value)
      await this.setState({
        searchQuery: e.target.value
      });
      this.searchRepos();

    }
  }

  handleShowDetail = async (d) => {
    console.log(d);
    let url = `${Apis.APIS.GET_REPO_DETAIL}`;
    url = url.replace('[REPONAME]', d.name)
    url = url.replace('[USER]', d.author)
    const request = Apis.request('GET', url);
    if (request) {
      request
        .then(resp => {
          console.log(resp.data)
          if (resp.data && resp.data) {
            this.setState({
              repoDetail: resp.data,
              showDetail: true,
              selectedRepo: d
            })
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    }
  }

  render() {
    let content = '';
    if (this.state.showDetail) {
      content = <div>
        <Detail
          data={{ ...this.state.selectedRepo, ...this.state.repoDetail }}

        />
      </div>
    } else {
      content = <div>
        <Table
          datas={this.state.repos}
          count={this.state.count}
          limit={this.state.limit}
          page={this.state.page}
          rowsperPageOptions={this.props.rowsperPageOptions}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          handleChangePage={this.handleChangePage}
          showDetail={this.handleShowDetail}
        />
      </div>
    }
    return (
      <React.Fragment>
        <Container maxWidth="lg">
          <h1>GIT REPOS</h1>
          <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="outlined-adornment-password">Search Repo</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onKeyDown={this.handleRepoSearch}
            label="search"
            />
            </FormControl>
            {this.state.showDetail && <Button onClick={this.searchRepos}>back</Button>}
          {content}
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.loader}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Container>
      </React.Fragment>
    )

  }
}

export default MainContainer;