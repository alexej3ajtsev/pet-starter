import React, { FormEvent, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@core/components/Link';

import './detailsId.css';
import { RouterContext } from 'src/@core/context/RouterContext';

export const getSSRProps = async (params: RouteParams = {}) => {
  const response = await axios.get(`/api/details/${params.id}`);
  return response.data;
};

const DetailsPage = (props: CommonPageProps) => {
  const [pageData, setPageData] = useState(props.ssrData);
  const hasData = 'data' in pageData;
  const emptyData = hasData && pageData.data === null;
  const { state: { params } } = useContext(RouterContext);
  const { id } = params; // this page called :id and it will receive id from url

  useEffect(() => {
    if (!hasData) {
      getSSRProps(params).then((data) => {
        setPageData(data);
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await axios.post(`/api/details/${id}`);
    console.log('Post result', response);
  };

  const renderContent = () => {
    if (!hasData) {
      return 'Loading...';
    }

    if (emptyData) {
      return (
        <form onSubmit={handleSubmit}>
          <button type="submit">Add data to Database</button>
        </form>
      );
    }
    return <div>{JSON.stringify(pageData, null, 4)}</div>;
  };

  return (
    <div className="detail">
      {renderContent()}
      <Link to="/">Go to main pages</Link>
    </div>
  );
};

export default DetailsPage;
