import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";


export const DetailPage = () => {
  const {token} = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const {request, loading} = useHttp();

  const getLink = useCallback(async () => {
    try{
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink(); //чтобы не писать useCallback можно определить getLink прямо в useEffect и сразу вызвать.
  }, [getLink])

  if (loading){
    return <Loader/>
  }

  return (
    <>
      { !loading && link && <LinkCard link={link}/>}
    </>
  )
}