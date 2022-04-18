/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface VoteCandidateInterface extends utils.Interface {
  contractName: "VoteCandidate";
  functions: {
    "addVoting(address[])": FunctionFragment;
    "finish(uint256)": FunctionFragment;
    "isCandidate(uint256,address)": FunctionFragment;
    "owner()": FunctionFragment;
    "participantCount(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "vote(uint256,address)": FunctionFragment;
    "voteCount(uint256,address)": FunctionFragment;
    "voteInfo(uint256,address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "addVoting", values: [string[]]): string;
  encodeFunctionData(
    functionFragment: "finish",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isCandidate",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "participantCount",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "vote",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "voteCount",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "voteInfo",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(functionFragment: "addVoting", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "finish", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isCandidate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "participantCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vote", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voteCount", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "voteInfo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { previousOwner: string; newOwner: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface VoteCandidate extends BaseContract {
  contractName: "VoteCandidate";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VoteCandidateInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addVoting(
      _candidates: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    finish(
      _voteId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isCandidate(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    participantCount(
      _voteId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    vote(
      _voteId: BigNumberish,
      _to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    voteCount(
      _voteId: BigNumberish,
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    voteInfo(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<[string]>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  addVoting(
    _candidates: string[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  finish(
    _voteId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isCandidate(
    _voteId: BigNumberish,
    _addr: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  owner(overrides?: CallOverrides): Promise<string>;

  participantCount(
    _voteId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  vote(
    _voteId: BigNumberish,
    _to: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  voteCount(
    _voteId: BigNumberish,
    _candidate: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  voteInfo(
    _voteId: BigNumberish,
    _addr: string,
    overrides?: CallOverrides
  ): Promise<string>;

  withdraw(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addVoting(
      _candidates: string[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    finish(_voteId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    isCandidate(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    owner(overrides?: CallOverrides): Promise<string>;

    participantCount(
      _voteId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    vote(
      _voteId: BigNumberish,
      _to: string,
      overrides?: CallOverrides
    ): Promise<void>;

    voteCount(
      _voteId: BigNumberish,
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    voteInfo(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<string>;

    withdraw(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): OwnershipTransferredEventFilter;
  };

  estimateGas: {
    addVoting(
      _candidates: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    finish(
      _voteId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isCandidate(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    participantCount(
      _voteId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    vote(
      _voteId: BigNumberish,
      _to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    voteCount(
      _voteId: BigNumberish,
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    voteInfo(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addVoting(
      _candidates: string[],
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    finish(
      _voteId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isCandidate(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    participantCount(
      _voteId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    vote(
      _voteId: BigNumberish,
      _to: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    voteCount(
      _voteId: BigNumberish,
      _candidate: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    voteInfo(
      _voteId: BigNumberish,
      _addr: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
