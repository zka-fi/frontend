import { resolve } from "path";
import { ApplyForm } from "../components/Form/ApplyForm";
import { createMerkleTree, proofMerkleTree } from "../services/merkle-tree.service";
import { useEffect, useState } from "react";
import { Box, Container, LinearProgress } from "@mui/material";


function Page() {
  return (
    <ApplyForm />
  )
}

export default Page