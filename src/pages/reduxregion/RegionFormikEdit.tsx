import React, { useEffect, useState } from "react";
import Region from '../../api/Region'
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { EditRegionRequest } from '../../redux-saga/action/regionAction'

export default function FormikRegionEdit(props: any) {
  const dispatch = useDispatch();
  const [previewImg, setPreviewImg] = useState<any>();
  const [upload, setUpload] = useState<any>(false);
  const { region } = useSelector((state: any) => state.regionState);

  useEffect(() => {
    Region.findData(props.id);
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: props.id,
      name: region.regionName,
      file: region.regionPhoto,
    },

    onSubmit: async (values) => {
      let payload= new FormData();
      payload.append("id", values.id);
      payload.append("name", values.name);
      payload.append("file", values.file);

      dispatch(EditRegionRequest(values));
      props.setDisplay(false);
      window.alert("Data Successfully Insert");
      props.setRefresh(true);
    },
  });

  const uploadConfig = (name: any) => (event: any) => {
    let reader = new FileReader();
    const file = event.target.files[0];
    reader.onload = () => {
      formik.setFieldValue("file", file);
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
    setUpload(true);
  };

  const onClear = (event: any) => {
    event.preventDefault();
    setPreviewImg(null);
    setUpload(false);
  };

  return (
    
    <>
    <div className = "flex items-stretch justify-center py-12">
        <div className = "mx-auto w-full max-w-[400px]">
            <div className="mb-6">
            <label htmlFor="region name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region Name</label>
                <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Region Name'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={formik.values.name}
                    onChange={formik.handleChange}>
                </input>
            </div>
            <div>
            <div className="col-span-full">
          <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
            Photo
          </label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {upload === false ? (
              <>
                <span>Kosong</span>
              </>
            ) : (
              <>
                <img src={previewImg} alt="img" />
                <span onClick={onClear}>Remove</span>
              </>
            )}
            <div className="text-center">
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadConfig("file")} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => formik.handleSubmit()}>Simpan</button>

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => props.setDisplay(false)}>cancel</button>
            </div>
        </div>
        </div>
    </>
  )
}