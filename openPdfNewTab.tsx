const abrirPdfNovaAba = async (tipo: string, data: any) => {
    if (data?.status === 1) return null
    const dadosUsuario: GetUsuarioProps | any = await getUsuario(
      data?.idUsuarioCliente
    )

    const contratante = {
      name: dadosUsuario?.nome,
      address:
        dadosUsuario?.endereco &&
        dadosUsuario?.endereco?.rua +
          ", " +
          dadosUsuario?.endereco?.numero +
          ", " +
          dadosUsuario?.endereco?.cidade +
          ", " +
          dadosUsuario?.endereco?.estado,
      category: data?.nomeCategoria,
      email: dadosUsuario?.email,
      eventName: data?.nomeEvento,
      identityDocument: dadosUsuario?.cpf
        ? MASCARA_CPF(dadosUsuario?.cpf)
        : MASCARA_CNPJ(dadosUsuario?.cnpj),
      telephone: dadosUsuario?.telefoneWhatsapp
        ? dadosUsuario?.telefoneWhatsapp
        : dadosUsuario?.telefoneComercial,
    } as ContractorProps

    const infoPagamento = {
      coupon: data?.cupom,
      discount: data?.valorDescontoCalculado,
      isProrated: data?.temLink,
      paymentTerms: data?.nomeCondicaoPagamento,
      tripNumber: data?.numero,
      signatureDate: data?.dataAssinatura,
      totalAdditional: data?.tiposVeiculo
        .map((item) => item.valorAdicionais)
        .reduce((a, b) => a + b, 0),
      totalItineraries: data?.tiposVeiculo?.map((item) => item.valorTrajeto),
    } as PaymentMethodProps

    const dadosTabela = data?.tiposVeiculo?.map((item) => ({
      embarkations: item.paradas
        .map((parada) => parada.descricao)
        .slice(0, item.paradas.length - 1),
      finalDestination: item.paradas
        .map((parada) => parada.descricao)
        .slice(-1),
      numberOfDays:
        Math.trunc(
          (Number(new Date(item.dataVolta)) - Number(new Date(item.dataIda))) /
            (1000 * 60 * 60 * 24)
        ) < 1
          ? 1
          : Math.trunc(
              (Number(new Date(item.dataVolta)) -
                Number(new Date(item.dataIda))) /
                (1000 * 60 * 60 * 24)
            ),
      passengerEstimation: data?.quantidadePassageiros,
      operator: item.terceiro ? "Terceiro" : "VAB",
      totalValue:
        data?.tiposVeiculo
          .map((item) => item.valorTrajeto)
          .reduce((a, b) => a + b) +
        data?.tiposVeiculo
          .map((item) => item.valorAdicionais)
          .reduce((a, b) => a + b),
      departureDateAndTime:
        new Date(item.dataIda).toLocaleDateString() +
        " " +
        new Date(item.dataIda).toLocaleTimeString("pt-BR", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }),
      arrivalDateAndTime:
        new Date(item.dataVolta).toLocaleDateString() +
        " " +
        new Date(item.dataVolta).toLocaleTimeString("pt-BR", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        }),
      contractedKm: item.quilometragemTotal,
      vehicleType: item.identificador,
      vehicleQuantity: 0,
      additional: item.adicionaisViagem.map((item) => item.nome),
      additionalUnitValue: item.adicionaisViagem.map((item) => item.valor),
      additionalQuantity: item.adicionaisViagem.map((item) => item.quantidade),
      additionalSubtotal: item.adicionaisViagem.map((item) => item.subtotal),
    }))

    const newTab = window.open(
      `${tipo === "contrato" ? "Contrato de Serviço" : "Proposta Comercial"} ${
        data?.numero
      }`,
      "_blank"
    )
    newTab.document.write(
      `<html><head><title>${
        tipo === "contrato" ? "Contrato de Serviço" : "Proposta Comercial"
      } ${
        data.numero
      }</title></head><body><div id="pdf-container"></div></body></html>`
    )

    const container = newTab.document.getElementById("pdf-container")
    if (container) {
      ReactDOM.render(
        <PDFViewer width="100%" height="100%">
          {tipo === "contrato" ? (
            <ServiceContract
              tableData={dadosTabela}
              contractorData={contratante}
              paymentMethods={infoPagamento}
            />
          ) : (
            <PropostaComercial
              tableData={dadosTabela}
              contractorData={contratante}
              paymentMethods={infoPagamento}
            />
          )}
        </PDFViewer>,
        container
      )
    }
  }
