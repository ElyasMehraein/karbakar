"use client"
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container } from "@mui/material";

export default function Map({ business }) {
    const position = [business.latitude, business.longitude]
    return (
        <>
            {position[0] &&
                <Container maxWidth="sm">
                    <MapContainer center={position} zoom={20} scrollWheelZoom={false} style={{ height: "300px" }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                {business?.mapDetail || "برای این آدرس جزئیاتی وارد نشده است"}
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Container>
            }
        </>
    )
}
